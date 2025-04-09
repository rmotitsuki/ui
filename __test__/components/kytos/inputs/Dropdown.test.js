import { mount, shallowMount, nextTick } from '@vue/test-utils';
import Dropdown from '@/components/kytos/inputs/Dropdown.vue';
import { describe, test, expect, beforeAll, afterEach, vi } from "vitest";

describe("Dropdown.vue", () => {
    let wrapper;
    const testOptions = [{value: "testVal1", description: "testDesc1"},
        {value: "testVal2", description: "testDesc2"},
        {value: "testVal3", description: "testDesc3"}];
    beforeAll(() => {
        expect(Dropdown).toBeTruthy();
    });

    afterEach(() => {
        wrapper.unmount();
        vi.restoreAllMocks();
    });

    //Inputs

    describe("Props", () => {
        test.skip("Default Dropdown Value", async () => {
            const testValue = "test";
            wrapper = mount(Dropdown, {
                props: {
                    options: testOptions
                }
            });
            expect(wrapper.exists()).toBe(true);

            expect(wrapper.props('value')).toBe("");

            await wrapper.setProps({ value: testValue });

            expect(wrapper.props('value')).toBe(testValue);
        });

        test("Dropdown Options", () => {
            wrapper = mount(Dropdown, {
                props: {
                    options: testOptions
                }
            });
            expect(wrapper.exists()).toBe(true);

            const [option1, option2, option3] = wrapper.findAll('option');
            const [optionText1, optionText2, optionText3] = [option1.text(), option2.text(), option3.text()];
            const [optionValue1, optionValue2, optionValue3] = [option1.element.value, option2.element.value, option3.element.value];

            expect(option1.exists()).toBe(true);
            expect(option2.exists()).toBe(true)
            expect(option3.exists()).toBe(true)

            expect(optionText1).toEqual(testOptions[0].description);
            expect(optionText2).toEqual(testOptions[1].description);
            expect(optionText3).toEqual(testOptions[2].description);

            expect(optionValue1).toEqual(testOptions[0].value);
            expect(optionValue2).toEqual(testOptions[1].value);
            expect(optionValue3).toEqual(testOptions[2].value);
        });

        test("Dropdown Default Option", () => {
            testOptions[2].selected = true;
            wrapper = mount(Dropdown, {
                props: {
                    options: testOptions
                }
            });
            expect(wrapper.exists()).toBe(true);

            expect(wrapper.vm.selected).toBe(testOptions[2].value);
        });

        test("Dropdown Default Option", () => {
            testOptions[2].selected = true;
            wrapper = mount(Dropdown, {
                props: {
                    options: testOptions
                }
            });
            expect(wrapper.exists()).toBe(true);

            expect(wrapper.vm.selected).toBe(testOptions[2].value);
        });

        test("Dropdown Global Event", async () => {
            const fn = vi.fn();
            let testEvent = {name: 'testName', content: {testsubContent: 'testsubContent'}};
            const testVal = 'testVal3';
            wrapper = mount(Dropdown, {
                props: {
                    options: testOptions,
                    event: testEvent
                },
                global: {
                    mocks: {
                        $kytos: {eventBus: {$emit: fn}}
                    }
                }
            });
            expect(wrapper.exists()).toBe(true);

            await wrapper.get('[data-test="main-dropdown"]').setValue(testVal);

            expect(fn).toHaveBeenCalledTimes(2);
            expect(fn).toHaveBeenCalledWith(testEvent.name, {testsubContent: 'testsubContent', value: testVal});
        });

        test("Dropdown Action", async () => {
            const fn = vi.fn();
            wrapper = mount(Dropdown, {
                props: {
                    options: testOptions
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainDropdown = wrapper.get('[data-test="main-dropdown"]');

            expect(wrapper.props().hasOwnProperty('action')).toBe(true);

            await wrapper.setProps({ action: fn });

            expect(wrapper.props('action')).toBe(fn);

            await mainDropdown.setValue('testVal3');

            expect(fn).toHaveBeenCalledTimes(2);
            expect(fn).toHaveBeenCalledWith(testOptions[2].value);
        });
    });

    describe("User Interactions", () => {
        test("Dropdown Data/Use Dropdown", async () => {
            wrapper = mount(Dropdown, {
                props: {
                    options: testOptions
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainDropdown = wrapper.get('[data-test="main-dropdown"]');

            await mainDropdown.setValue('testVal3');

            expect(wrapper.vm.selected).toEqual('testVal3');
        });
    });

    //Outputs

    describe("DOM Elements", () => {
        test("Dropdown", () => {
            wrapper = mount(Dropdown, {
                props: {
                    options: testOptions
                }
            });
            expect(wrapper.exists()).toBe(true);

            expect(wrapper.find('[data-test="main-dropdown"]').exists()).toBe(true);
        });

        test("Icon", async () => {
            const testIcon = "arrow-right";
            wrapper = shallowMount(Dropdown, {
                props: {
                    options: testOptions
                }
            });
            expect(wrapper.exists()).toBe(true);

            expect(wrapper.find('[data-test="main-icon"]').exists()).toBe(false);

            await wrapper.setProps({ icon: testIcon });

            expect(wrapper.find('[data-test="main-icon"]').exists()).toBe(true);

            const icon = wrapper.get('[data-test="main-icon"]');

            expect(icon.attributes('icon')).toBe(testIcon);
        });
    });

    describe("Emits", () => {
        test.skip("Emit Dropdown Value", async () => {
            wrapper = mount(Dropdown, {
                props: {
                    options: testOptions
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainDropdown = wrapper.get('[data-test="main-dropdown"]');

            await mainDropdown.setValue('testVal3');

            expect(wrapper.emitted('update:value')).toHaveLength(2);
            expect(wrapper.emitted('update:value')[0]).toEqual([testOptions[2].value]);
        });
    });

    //V-Model

    describe("V-Models", () => {
        test.skip("V-Model Value", async () => {
            wrapper = mount(Dropdown, {
                props: {
                value: "",
                'onUpdate:value': (e) => wrapper.setProps({ value: e }),
                options: testOptions
                }
            });

            await wrapper.get('[data-test="main-dropdown"]').setValue('testVal3');
            
            expect(wrapper.props('value')).toEqual(testOptions[2].value);
            });
    });
});