import { conditionTree, ConditionTreeNode } from '../src';

describe("conditionTree", () => {
    let consoleLogSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        consoleLogSpy.mockRestore();
    });

    it("should execute the correct function based on the conditions", () => {
        let x: number = 15;

        conditionTree({
            condition: () => x > 10,
            value: () => console.log("x > 10"),
            children: [
                {
                    condition: () => x > 5,
                    value: () => console.log("x > 5"),
                    children: [
                        {
                            condition: () => x > 0,
                            value: () => console.log("x > 0"),
                            children: []
                        }
                    ]
                }
            ]
        });

        expect(consoleLogSpy).toHaveBeenCalledWith("x > 10");
        expect(consoleLogSpy).not.toHaveBeenCalledWith("x > 5");
        expect(consoleLogSpy).not.toHaveBeenCalledWith("x > 0");
    });
});
