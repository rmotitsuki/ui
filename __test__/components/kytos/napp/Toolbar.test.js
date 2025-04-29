import { mount, shallowMount, flushPromises } from "@vue/test-utils";
import axios from "axios";
import Toolbar from "@/components/kytos/napp/Toolbar.vue";
import {
  describe,
  test,
  expect,
  beforeAll,
  afterEach,
  vi,
  beforeEach,
} from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useToolbarStore } from "@/stores/toolbarStore.js";

const mockComponentList = [
  {
    name: "kytos-maintenance-k-toolbar-main",
    url: "ui/kytos/maintenance/k-toolbar/main.kytos",
  },
  {
    name: "kytos-mef_eline-k-toolbar-main",
    url: "ui/kytos/mef_eline/k-toolbar/main.kytos",
  },
  {
    name: "kytos-pathfinder-k-toolbar-main",
    url: "ui/kytos/pathfinder/k-toolbar/main.kytos",
  },
  {
    name: "kytos-telemetry_int-k-toolbar-main",
    url: "ui/kytos/telemetry_int/k-toolbar/main.kytos",
  },
  {
    name: "amlight-sdntrace-k-toolbar-main",
    url: "ui/amlight/sdntrace/k-toolbar/main.kytos",
  },
  {
    name: "amlight-sdntrace_cp-k-toolbar-main",
    url: "ui/amlight/sdntrace_cp/k-toolbar/main.kytos",
  },
];

const spy = vi.spyOn(axios, "get").mockImplementation(() => mockComponentList);

describe("Input.vue", () => {
  let wrapper;
  beforeAll(() => {
    expect(Toolbar).toBeTruthy();
  });

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    wrapper.unmount();
    vi.clearAllMocks();
  });

  //Inputs

  describe("Props", () => {
    test("Disabling Input", async () => {
      wrapper = mount(Input);
      expect(wrapper.exists()).toBe(true);
      const mainInput = wrapper.get('[data-test="main-input"]');
      expect(mainInput.element.hasAttribute("disabled")).toBe(false);

      await wrapper.setProps({ isDisabled: true });

      expect(mainInput.element.hasAttribute("disabled")).toBe(true);
    });

    test("Default Input Value", async () => {
      const testValue = "test";
      wrapper = mount(Input);
      expect(wrapper.exists()).toBe(true);
      const mainInput = wrapper.get('[data-test="main-input"]');

      expect(mainInput.element.hasAttribute("value")).toBe(true);

      await wrapper.setProps({ value: testValue });

      expect(mainInput.attributes("value")).toBe(testValue);
    });

    test("Input Tooltip", async () => {
      const testValue = "test";
      wrapper = mount(Input);
      expect(wrapper.exists()).toBe(true);
      const mainInput = wrapper.get('[data-test="main-input"]');

      expect(mainInput.element.hasAttribute("title")).toBe(false);

      await wrapper.setProps({ tooltip: testValue });

      expect(mainInput.attributes("title")).toBe(testValue);
    });

    test("Input Placeholder", async () => {
      const testValue = "test";
      wrapper = mount(Input);
      expect(wrapper.exists()).toBe(true);
      const mainInput = wrapper.get('[data-test="main-input"]');

      expect(mainInput.element.hasAttribute("placeholder")).toBe(false);

      await wrapper.setProps({ placeholder: testValue });

      expect(mainInput.attributes("placeholder")).toBe(testValue);
    });

    test("Input Action", async () => {
      const fn = vi.fn();
      const text = "test";
      wrapper = mount(Input);
      expect(wrapper.exists()).toBe(true);
      const mainInput = wrapper.get('[data-test="main-input"]');

      expect(wrapper.props().hasOwnProperty("action")).toBe(true);

      await wrapper.setProps({ action: fn });

      expect(wrapper.props("action")).toBe(fn);

      await mainInput.setValue(text);

      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(text);
    });
  });

  describe("User Interactions", () => {
    test("Input Data/Write/Use Input", async () => {
      const text = "test";
      wrapper = mount(Input);
      expect(wrapper.exists()).toBe(true);
      const mainInput = wrapper.get('[data-test="main-input"]');

      await mainInput.setValue(text);

      expect(mainInput.element.value).toContain(text);
    });
  });

  describe("HTTP Requests", () => {
    test("Fetch k-toolbar Components", async () => {
      wrapper = mount(Toolbar, {
        props: {
          active: 1,
        },
        global: {
          mocks: {
            $kytos_server: "http://localhost:8181/",
          },
        },
      });
      expect(wrapper.exists()).toBe(true);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(
        "http://localhost:8181/ui/k-toolbar"
      );

      await flushPromises();

      
    });
  });

  //Outputs

  describe("DOM Elements", () => {
    test("Input", () => {
      wrapper = mount(Input);
      expect(wrapper.exists()).toBe(true);

      expect(wrapper.find('[data-test="main-input"]').exists()).toBe(true);
    });

    test("Icon", async () => {
      const testIcon = "arrow-right";
      wrapper = shallowMount(Input);
      expect(wrapper.exists()).toBe(true);

      expect(wrapper.find('[data-test="main-icon"]').exists()).toBe(false);

      await wrapper.setProps({ icon: testIcon });

      expect(wrapper.find('[data-test="main-icon"]').exists()).toBe(true);

      const icon = wrapper.get('[data-test="main-icon"]');

      expect(icon.attributes("icon")).toBe(testIcon);
    });
  });

  describe("Emits", () => {
    test("Emit Input Value", async () => {
      const text = "test";
      wrapper = mount(Input);
      expect(wrapper.exists()).toBe(true);
      const mainInput = wrapper.get('[data-test="main-input"]');

      await mainInput.setValue(text);

      expect(wrapper.emitted("update:value")).toHaveLength(1);
      expect(wrapper.emitted("update:value")[0]).toEqual([text]);
    });
  });

  //V-Model

  describe("V-Models", () => {
    test("V-Model Value", async () => {
      const text = "test";
      wrapper = mount(Input, {
        props: {
          value: "initialText",
          "onUpdate:value": (e) => wrapper.setProps({ value: e }),
        },
      });

      await wrapper.get('[data-test="main-input"]').setValue(text);
      expect(wrapper.props("value")).toBe(text);
    });
  });
});
