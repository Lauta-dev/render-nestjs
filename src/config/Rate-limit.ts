export class RateLimit {
	static config() {
		return [
			{
				name: "Per-minutes",
				ttl: 60000,
				limit: 60,
			},
			{
				name: "Per-second",
				ttl: 10000,
				limit: 8,
			},
		];
	}
}
