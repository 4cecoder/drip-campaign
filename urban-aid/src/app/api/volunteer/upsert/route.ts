import { NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { AssistanceType, Role } from "../../../../generated/prisma";
import { setVolunteerSkills } from "../../../../lib/matching";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { userId, name, phone, latitude, longitude, radiusKm, skills, available } = body as {
			userId?: string;
			name: string;
			phone: string;
			latitude?: number;
			longitude?: number;
			radiusKm?: number;
			skills?: (keyof typeof AssistanceType)[];
			available?: boolean;
		};

		const user = await prisma.user.upsert({
			where: userId ? { id: userId } : { phone },
			update: { name, phone, role: Role.VOLUNTEER, latitude, longitude, lastSeenAt: new Date() },
			create: { name, phone, role: Role.VOLUNTEER, latitude, longitude, lastSeenAt: new Date() },
		});

		const profile = await prisma.volunteerProfile.upsert({
			where: { userId: user.id },
			update: { radiusKm: radiusKm ?? 5, available: available ?? true },
			create: { userId: user.id, radiusKm: radiusKm ?? 5, available: available ?? true },
		});

		if (skills && skills.length > 0) {
			await setVolunteerSkills(profile.id, skills.map((s) => AssistanceType[s]));
		}

		const result = await prisma.volunteerProfile.findUnique({
			where: { id: profile.id },
			include: { user: true, skills: true },
		});

		return Response.json({ profile: result });
	} catch (error: any) {
		return Response.json({ error: error.message ?? "Server error" }, { status: 500 });
	}
}

