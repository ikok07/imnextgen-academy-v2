import {ITestService} from "@/modules/test/src/application/services/test.service.interface";

export class TestService implements ITestService {
    async testMethod(): Promise<void> {
        console.log("TEST METHOD RUNNING...")
    }
}