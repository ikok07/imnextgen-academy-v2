import {createTestModule} from "@/modules/test/di/modules/test.module";
import {Container} from "@evyweb/ioctopus";

export default function loadDIModules(container: Container) {
    container.load(Symbol("TestModule"), createTestModule());
}