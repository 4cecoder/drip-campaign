import { prisma } from "../lib/prisma";
import { haversineDistanceKm } from "./geo";
import { AssistanceType, RequestStatus, Role } from "../generated/prisma";

export async function matchVolunteersForRequest(requestId: string) {
	const request = await prisma.helpRequest.findUnique({
		where: { id: requestId },
		include: { requester: true },
	});
	if (!request) throw new Error("Request not found");

	const { latitude, longitude, type } = request;

	const volunteerProfiles = await prisma.volunteerProfile.findMany({
		where: {
			available: true,
			user: { role: Role.VOLUNTEER, latitude: { not: null }, longitude: { not: null } },
			skills: { some: { type } },
		},
		include: { user: true, skills: true },
	});

	const ranked = volunteerProfiles
		.map((vp) => {
			const distanceKm = haversineDistanceKm(
				{ lat: request.latitude, lng: request.longitude },
				{ lat: vp.user.latitude as number, lng: vp.user.longitude as number }
			);
			const within = distanceKm <= vp.radiusKm;
			return { vp, distanceKm, within };
		})
		.filter((x) => x.within)
		.sort((a, b) => a.distanceKm - b.distanceKm)
		.slice(0, 5);

	// Pick the nearest one for initial offer (simple rule-based matching)
	if (ranked.length === 0) {
		return { offer: null, candidates: [] as string[] };
	}

	const top = ranked[0];
	const offer = await prisma.helpOffer.create({
		data: {
			volunteerId: top.vp.userId,
			requestId: request.id,
			message: "Auto-matched by proximity and skill",
			etaMinutes: null,
		},
		include: { volunteer: true, request: true },
	});

	await prisma.helpRequest.update({
		where: { id: request.id },
		data: { status: RequestStatus.MATCHED },
	});

	return { offer, candidates: ranked.map((r) => r.vp.userId) };
}

export async function setVolunteerSkills(profileId: string, skills: AssistanceType[]) {
	// Reset skills via upsert logic
	await prisma.volunteerSkill.deleteMany({ where: { profileId } });
	if (skills.length === 0) return;
	await prisma.volunteerSkill.createMany({
		data: skills.map((type) => ({ profileId, type })),
		skipDuplicates: true,
	});
}

