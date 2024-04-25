import { describe, expect, jest, afterEach, it } from '@jest/globals';
import { concurrentProcessor } from './concurrent-processor';

const mockProcessItem = jest.fn().mockImplementation((item: any) => {
    return Promise.resolve();
});

describe('concurrentProcessor function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should process all items without processing the same item twice', async () => {
        const items = [1, 2, 3, 4, 5];

        await concurrentProcessor(items, 2, mockProcessItem as any);

        expect(mockProcessItem).toHaveBeenCalledTimes(5); // 5 items processed
    });

    it('should handle concurrency limit properly', async () => {
        const items = [1, 2, 3, 4, 5];

        await concurrentProcessor(items, 2, mockProcessItem as any);

        expect(mockProcessItem).toHaveBeenCalledTimes(5); // 5 items processed

        // Ensure that only 2 items were processed concurrently
        expect(mockProcessItem.mock.calls.slice(0, 2)).toEqual([[1], [2]]);
    });
});
