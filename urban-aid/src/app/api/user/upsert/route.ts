import { NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { Role } from "../../../../generated/prisma";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { name, phone, role, latitude, longitude } = body as {
			name: string;
			phone: string;
			role: keyof typeof Role;
			latitude?: number;
			longitude?: number;
		};
		if (!name || !phone || !role) {
			return Response.json({ error: "Missing required fields" }, { status: 400 });
		}
		const user = await prisma.user.upsert({
			where: { phone },
			update: { name, role: Role[role], latitude, longitude, lastSeenAt: new Date() },
			create: { name, phone, role: Role[role], latitude, longitude, lastSeenAt: new Date() },
		});
		return Response.json({ user });
	} catch (error: any) {
		return Response.json({ error: error.message ?? "Server error" }, { status: 500 });
	}
}

