"use client"

import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {useAppUser} from "@/app/_hooks/auth/useUser";
import PrimaryInput from "@/app/_components/ui/inputs/PrimaryInput";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/app/_components/ui/shadcn/alert-dialog";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {createTodo, getTodos} from "@/app/actions";
import {useEffect, useState} from "react";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {useQueryClient} from "react-query";
import {Todo} from "@/drizzle/schema/todo";
import {ServerActionResult} from "@/app/_utils/createServerAction";
import {handleParse, trackErrors} from "@/app/_utils/handleInputValidation";
import {z} from "zod";
import {toast} from "sonner";

export default function TodosComponent() {
    const queryClient = useQueryClient();
    const {authData} = useAppUser();
    const [content, setContent] = useState<string | null>(null);
    const [errors, setErrors] = useState<string[]>([]);

    const {data: queryTodos, isLoading: isGettingTodos} = useErrorQuery({
        queryFn: () => getTodos(),
        queryKey: ["todos"]
    })

    const {mutate: createTodoMethod, isLoading: isCreatingTodo, error: createTodoError} = useErrorMutation({
        mutationFn: () => createTodo({
            userId: authData.userId ?? undefined,
            content: content ?? undefined
        }),
        onSuccess(data) {
            if (!data.success || !data.value) return;

            queryClient.setQueryData(["todos"], (old: unknown) => {
                const oldData = old as ServerActionResult<Todo[] | null> | undefined;
                if (!oldData?.success || !oldData.value) return undefined;

                return {...oldData, value: [...oldData.value, data.value]};
            })
            setContent(null);
        }
    })

    useEffect(() => {
        if (createTodoError) toast.error("Something went wrong", {
            closeButton: true,
            description: "Failed to create new todo!",
        });
    }, [createTodoError]);

    if (!authData.isSignedIn) return;

    return <div>
        <h1>TODOS:</h1>
        <h2>Todos Count: {queryTodos?.success ? queryTodos.value?.length : isGettingTodos ? "Loading..." : "-"}</h2>
        <div className="w-max space-y-3">
            <PrimaryInput
                label="Content"
                placeholder="Buy milk"
                value={content ?? ""}
                error={handleParse({
                    type: "ignoreNull",
                    value: content,
                    validateCb: () => z.string().min(1, {message: "Invalid input"}).parse(content),
                    trackErrorsFunc: (id, action) => trackErrors(id, action, errors, setErrors),
                    errorId: "content",
                })}
                onChange={e => setContent(e.target.value)}
            />
            <AlertDialog>
                <AlertDialogTrigger disabled={errors.length > 0}>
                    <PrimaryButton
                        loading={isCreatingTodo}
                        loadingText="Inserting todo"
                        disabled={errors.length > 0}
                    >
                        Insert todo
                    </PrimaryButton>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            You will add a todo to the database
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild={true}>
                                <PrimaryButton onClick={() => createTodoMethod()}>Continue</PrimaryButton>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    </div>
}