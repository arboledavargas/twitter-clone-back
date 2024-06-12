import { z } from "zod";

const configSchema = z.object({
	DATABASE_URL: z.string(),
	AUTH_AUDIENCE: z.string(),
	AUTH_ISSUER_BASEURL: z.string()
});

export type Config = z.infer<typeof configSchema>;

export function validateConfig(config: Record<string, unknown>){
	return configSchema.parse(config)
}