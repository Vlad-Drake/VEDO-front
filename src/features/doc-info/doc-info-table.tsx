import { SkeletonKit } from '@/shared/ui/skeleton-kit';
import styles from './doc-info-table.module.scss';

export function DocInfoTable({
    selectedDocId,
    docName,
    isPending,
    docInfo,
}: {
    selectedDocId: number | null,
    docName: string,
    isPending: boolean,
    docInfo?: {
        question: string;
        answer: string;
    }[],
}) {

    if (!selectedDocId) return null;

    return (

        <div className='flex flex-col gap-[10px]'>
            <h2 className="text-left">{docName}</h2>

            <div>
                {!isPending &&
                    (docInfo ?? []).map((item, index) => (
                        <div className={styles["content-row"]} key={index}>
                            <div className={styles["question"]}>
                                <p>{item.question}</p>
                            </div>

                            <div className={styles["answer"]}>
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))
                }
                {isPending && [...Array(3)].map((_, index) =>
                    <div key={index} className={styles["content-row"]}>
                        <div className={styles["question"]}>
                            <p>
                                <SkeletonKit
                                    type="text"
                                />
                            </p>

                        </div>
                        <div className={styles["answer"]}>
                            <p>
                                <SkeletonKit
                                    type="text"
                                />
                            </p>
                        </div>
                    </div>
                )}
            </div>

        </div>

    );
}