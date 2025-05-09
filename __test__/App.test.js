import { mount, shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import Menubar from '@/components/kytos/misc/Menubar.vue';
import { describe, test, expect, beforeAll, beforeEach } from "vitest";
import { setActivePinia, createPinia } from 'pinia'

describe("App", () => {
    beforeAll(() => {
        expect(App).toBeTruthy();
    });
    beforeEach(() => {
      setActivePinia(createPinia())
    })
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