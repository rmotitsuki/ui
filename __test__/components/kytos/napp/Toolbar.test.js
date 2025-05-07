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
import { createTestingPinia } from "@pinia/testing";
import { useToolbarStore } from "@/stores/toolbarStore.js";

const mockComponentList = {data: [
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
]};

vi.spyOn(axios, "get").mockResolvedValue(mockComponentList);
const mockFunction = vi.fn();

describe("Toolbar.vue", () => {
  let wrapper;
  beforeAll(() => {
    expect(Toolbar).toBeTruthy();
  });

  afterEach(() => {
    wrapper.unmount();
    vi.clearAllMocks();
  });

  //Inputs

  describe("Props", () => {
    test("Active Toolbar Item", async () => {
      wrapper = mount(Input);
      expect(wrapper.exists()).toBe(true);
      const mainInput = wrapper.get('[data-test="main-input"]');
      expect(mainInput.element.hasAttribute("disabled")).toBe(false);

      await wrapper.setProps({ isDisabled: true });

      expect(mainInput.element.hasAttribute("disabled")).toBe(true);
    });
  });

  describe("HTTP Requests", () => {
    test("Fetch k-toolbar Components", async () => {
      wrapper = mount(Toolbar, {
        props: {
          active: 1,
        },
        global: {
          plugins: [
            createTestingPinia({
              createSpy: vi.fn
            }),
          ],
          mocks: {
            $kytos_server: "http://localhost:8181/",
            $http: axios,
            $kytos: { component: mockFunction }
          },
        },
      });
      expect(wrapper.exists()).toBe(true);
      const store = useToolbarStore();

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8181/ui/k-toolbar"
      );

      await flushPromises();

      expect(store.toolbarItemsList).toEqual(mockComponentList.data);
      expect(mockFunction).toHaveBeenCalledTimes(mockComponentList.data.length);
    });
    //Fail
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

  describe("vue3-sfc-loader", () => {
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

});
