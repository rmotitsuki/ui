import { mount, shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import Menubar from '@/components/kytos/misc/Menubar.vue';
import { describe, test, expect, beforeAll } from "vitest";

describe("App", () => {
    beforeAll(() => {
        expect(App).toBeTruthy();
    });
    test("Does a wrapper exists?", () => {
        const wrapper = mount(App, {
            global: {
              components: {
                'k-menubar': Menubar
              }
            }
    });
        expect(wrapper.exists()).toBe(true);
    });
});