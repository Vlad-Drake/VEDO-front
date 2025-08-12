import { useRegularApprovers } from "./use-regular-approvers";
import { SkeletonKit } from "@/shared/ui/skeleton-kit";
import { RegularApproversForm } from "./regular-approvers-form";
import { NotificationKit } from "@/shared/ui/notification-kit";
import { useDocTypesProcessed } from "./use-docs-types-processed";

function RegularApprovers() {
    const docTypes = useDocTypesProcessed();
    const { regularApprovers, isPending, createRegularApprover, error: errorGet } = useRegularApprovers();

    return (
        <div className="gap-[35px] content">
            <h2 className="text-center">Постоянные подписанты</h2>
            <div className='flex gap-[50px] justify-center'>

                <div className='flex flex-col gap-[20px]'>
                    <table className="w-[600px] border border-[var(--color-gray)] divide-y divide-[var(--color-gray)]">
                        <thead>
                            <tr className="bg-[var(--color-gray-light)] divide-x divide-[var(--color-gray)]">
                                <th className="px-4 py-2 text-left w-[100px]">Префикс</th>
                                <th className="px-4 py-2 text-left w-[300px]">Тип документа</th>
                                <th className="px-4 py-2 text-left w-[200px]">Почта</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-gray)]">
                            {regularApprovers && !isPending && docTypes.docsTypesProcessed &&
                                regularApprovers.map(approver =>
                                    <tr key={approver.pref} className="odd:bg-[var(--color-gray-light)] divide-x divide-[var(--color-gray)]">
                                        <td className="px-4 py-2 text-left">{approver.pref}</td>
                                        <td className="px-4 py-2 text-left">{docTypes.docsTypesProcessed?.[approver.docId].docType}</td>
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
                            {regularApprovers && regularApprovers?.length === 0 &&
                                <h3>Здесь пусто</h3>
                            }
                        </tbody>
                    </table>
                    <div>
                        {errorGet.isError &&
                            <NotificationKit
                                type='error'
                            >
                                <h3>Ошибка</h3>
                                {errorGet.error?.message}
                            </NotificationKit>
                        }
                    </div>

                </div>

                <RegularApproversForm
                    createRegularApprover={createRegularApprover}
                />

            </div>

        </div >
    )
}

export const Component = RegularApprovers;