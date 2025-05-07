### Install steps

1. Export all pages from the module's ```/app``` folder in the root ```/app```
```ts
    export {default} from "@/modules/<module>/app/<page-path>"
```
2. Add module's ```DI_SYMBOLS``` and ```RETURN_TYPES``` in the root files
```ts
import * as DI_TEST_MODULE from "@/modules/test/di/types/types"

const MODULE_DI_SYMBOLS = {
    ...DI_TEST_MODULE.DI_SYMBOLS
};

interface MODULE_RETURN_TYPES extends
    DI_TEST_MODULE.DI_RETURN_TYPES
{}

export const DI_SYMBOLS = {
    ...MODULE_DI_SYMBOLS
    // other symbols...
};

export interface DI_RETURN_TYPES extends
    MODULE_RETURN_TYPES
    // other return types...
{}
```

3. Invoke the module's ```loadDIModules()``` function by importing it in the root ```container.ts```
#### `@/modules/<module>/di/container.ts`
```ts
    import {Container} from "@evyweb/ioctopus";
    
    export default function loadDIModules(container: Container) {
        container.load(Symbol("TestModule"), createTestModule());
    }
```

#### `@/di/container.ts`
```ts
    import loadTestModules from "@/modules/<module>/di/container";
    
    function loadExternalModules(container: Container) {
        loadTestModules(container);
    }
    
    const ApplicationContainer = createContainer();
    
    loadExternalModules(ApplicationContainer);
    
    // ... other modules
```