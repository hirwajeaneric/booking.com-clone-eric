import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../hooks/customHooks";
import * as apiClient from "../api-client";

/**
 * A functional component that renders a sign out button.
 * When clicked, it triggers a sign out mutation using the `useMutation` hook from `react-query`.
 * If the sign out is successful, it invalidates the "validateToken" query and shows a success toast.
 * If there is an error during the sign out, it shows an error toast.
 *
 * @returns {JSX.Element} - The rendered sign out button.
 */
const SignOutButton = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();

    /**
     * A mutation for signing out.
     * It uses the `signOut` function from the `apiClient` module.
     *
     * @type {import('react-query').UseMutationResult<unknown, unknown, void, unknown>}
     */
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken");
            showToast({ message: "Signed Out!", type: "SUCCESS" });
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        }
    });

    /**
     * A function that triggers the sign out mutation.
     */
    const signOut = () => {
        mutation.mutate();
    };

    return (
        <button onClick={signOut} className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100">Sign out</button>
    )
}

export default SignOutButton