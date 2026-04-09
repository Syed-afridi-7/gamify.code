const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export interface Problem {
    id: number;
    title: string;
    description: string;
    difficulty: string;
    topic_tags: string[];
    xp_reward: number;
    source: string;
    external_link: string;
}

export interface ProblemListResponse {
    items: Problem[];
    total: number;
    page: number;
    size: number;
}

export async function getProblems(page = 1, size = 10, topic?: string, difficulty?: string): Promise<ProblemListResponse> {
    const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
    });
    if (topic) params.append("topic", topic);
    if (difficulty) params.append("difficulty", difficulty);

    const response = await fetch(`${API_BASE_URL}/problems/?${params.toString()}`);
    if (!response.ok) {
        throw new Error("Failed to fetch problems");
    }
    return response.json();
}
