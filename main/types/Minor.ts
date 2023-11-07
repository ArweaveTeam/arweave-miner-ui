export type MinorParser = {
    name: string;
    help: string;
    type: string;
    metrics: {
        value: string;
        labels: Record<string, string>;
        buckets: Record<string, string>;
    }[]
}