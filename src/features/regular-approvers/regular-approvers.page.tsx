import { useRegularApprovers } from "./use-regular-approvers";
import { SkeletonKit } from "@/shared/ui/skeleton-kit";
import { RegularApproversForm } from "./regular-approvers-form";

function RegularApprovers() {

    const { regularApprovers, isPending, createRegularApprover } = useRegularApprovers();

    return (
        <div className="gap-[35px] content">
            <h2 className="text-center">Постоянные подписанты</h2>
            <div className='flex gap-[50px] justify-center'>

                <div>
                    <table className="w-[500px] border border-[var(--color-gray)] divide-y divide-[var(--color-gray)]">
                        <thead>
                            <tr className="bg-[var(--color-gray-light)] divide-x divide-[var(--color-gray)]">
                                <th className="px-4 py-2 text-left w-[100px]">Префикс</th>
                                <th className="px-4 py-2 text-left w-[200px]">Тип документа</th>
                                <th className="px-4 py-2 text-left w-[200px]">Почта</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-gray)]">
                            {regularApprovers && !isPending &&
                                regularApprovers.map(approver =>
                                    <tr className="odd:bg-[var(--color-gray-light)] divide-x divide-[var(--color-gray)]">
                                        <td className="px-4 py-2 text-left">{approver.pref}</td>
                                        <td className="px-4 py-2 text-left">{approver.docId}</td>
                                        <td className="px-4 py-2 text-left">{approver.email}</td>
                                    </tr>
                                )
                            }
                            {isPending &&
                                [...Array(3)].map((_, index) =>
                                    <tr key={index} className="odd:bg-[var(--color-gray-light)] divide-x divide-[var(--color-gray)]">
                                        <td className="px-4 py-2 text-left"><SkeletonKit type='text' width="100%" /></td>
                                        <td className="px-4 py-2 text-left"><SkeletonKit type='text' width="100%" /></td>
                                        <td className="px-4 py-2 text-left"><SkeletonKit type='text' width="100%" /></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

                <RegularApproversForm
                    createRegularApprover={createRegularApprover}
                />

            </div>

        </div>
    )
}

export const Component = RegularApprovers;