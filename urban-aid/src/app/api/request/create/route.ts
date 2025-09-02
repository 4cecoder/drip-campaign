import { NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { AssistanceType, Role } from "../../../../generated/prisma";
import { matchVolunteersForRequest } from "../../../../lib/matching";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { requesterPhone, description, type, latitude, longitude } = body as {
			requesterPhone: string;
			description: string;
			type: keyof typeof AssistanceType;
			latitude: number;
			longitude: number;
		};

		if (!requesterPhone || !description || !type || latitude == null || longitude == null) {
			return Response.json({ error: "Missing required fields" }, { status: 400 });
		}

		const user = await prisma.user.upsert({
			where: { phone: requesterPhone },
			update: { role: Role.REQUESTER, lastSeenAt: new Date(), latitude, longitude },
			create: { name: requesterPhone, phone: requesterPhone, role: Role.REQUESTER, latitude, longitude, lastSeenAt: new Date() },
		});

		const request = await prisma.helpRequest.create({
			data: {
				requesterId: user.id,
				description,
				type: AssistanceType[type],
				latitude,
				longitude,
			},
		});

		const matchResult = await matchVolunteersForRequest(request.id);
		return Response.json({ request, matchResult });
	} catch (error: any) {
		return Response.json({ error: error.message ?? "Server error" }, { status: 500 });
	}
}

