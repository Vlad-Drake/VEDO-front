import { SkeletonKit } from "@/shared/ui/skeleton-kit";

type DocsType = {
    docName: string;
    date: string;
    approved: boolean;
}

export function DocsTable({
    docsList,
    management,
    isPending,
}: {
    docsList?: DocsType[],
    isPending: boolean,
    management: React.ReactNode
}) {

    return (
        <div>
            {!isPending && docsList && management}
            <table className="min-w-full border border-[var(--color-gray)] divide-y divide-[var(--color-gray)]">
                <thead>
                    <tr className="bg-[var(--color-gray-light)] divide-x divide-[var(--color-gray)]">
                        {!isPending && docsList && <>
                            <th className="px-4 py-2 text-left">Имя документа</th>
                            <th className="px-4 py-2 text-left">Дата прихода</th>
                            <th className="px-4 py-2 text-left">Статус</th>
                        </>}
                        {isPending && <>
                            <th className="px-4 py-2 text-left"><SkeletonKit type='text' /></th>
                            <th className="px-4 py-2 text-left"><SkeletonKit type='text' /></th>
                            <th className="px-4 py-2 text-left"><SkeletonKit type='text' /></th>
                        </>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-gray)]">
                    {!isPending && (docsList ?? []).map((item, index) => (
                        <tr key={`${index}_docRow`} className="odd:bg-[var(--color-gray-light)] divide-x divide-[var(--color-gray)]">
                            <td className="px-4 py-2 text-left">{item.docName}</td>
                            <td className="px-4 py-2 text-left">{item.date}</td>
                            <td className="px-4 py-2 text-left">{item.approved ? '+' : '-'}</td>
                        </tr>
                    ))}
                    {isPending &&
                        <>
                            <tr className="odd:bg-[var(--color-gray-light)] divide-x divide-[var(--color-gray)]">
                                <td className="px-4 py-2 text-left"><SkeletonKit type='text' /></td>
                                <td className="px-4 py-2 text-left"><SkeletonKit type='text' /></td>
                                <td className="px-4 py-2 text-left"><SkeletonKit type='text' /></td>
                            </tr>
                            <tr className="odd:bg-[var(--color-gray-light)] divide-x divide-[var(--color-gray)]">
                                <td className="px-4 py-2 text-left"><SkeletonKit type='text' /></td>
                                <td className="px-4 py-2 text-left"><SkeletonKit type='text' /></td>
                                <td className="px-4 py-2 text-left"><SkeletonKit type='text' /></td>
                            </tr>
                        </>
                    }

                </tbody>
            </table>
        </div>
    );
}