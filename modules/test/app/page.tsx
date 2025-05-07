import TestComponent from "@/modules/test/app/_components/TestComponent";
import {testMethod} from "@/modules/test/app/action";

export default async function Page() {
    console.log(await testMethod());

    return <div>
        THIS IS A TEST MODULE PAGE
        <TestComponent />
    </div>
}