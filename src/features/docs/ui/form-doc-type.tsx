import { ROUTES } from "@/shared/model/routers";
import { SelectKit } from "@/shared/ui/selectKit";
import { SkeletonKit } from "@/shared/ui/skeleton-kit";
import type { RefObject } from "react";
import { href, useNavigate } from "react-router-dom";

export function FormDocType({
    docTypes,
    isPending,
    selectedDocId,
    docName,
    changeDoc
}: {
    docTypes?: {
        id: number;
        docType: string;
    }[],
    isPending: boolean,
    selectedDocId: number | null,
    docName: RefObject<string>,
    changeDoc: (val: string | number) => void,
}) {
    const navigate = useNavigate();
    const setURL = (value: string) => {
        navigate(href(ROUTES.DOCS, { docstype: value }));
    }

    return (
        <div className="flex flex-row gap-10 justify-start">
            <p className={`w-[200px] content-center text-left`}>
                Выберите тип документа:
            </p>
            {docTypes &&
                <SelectKit
                    placeholder='Выберите тип документа'
                    width="500px"
                    selectedId={selectedDocId}
                    updateId={(event) => changeDoc(event)}
                    updateName={(event) => {
                        setURL(String(event));
                        docName.current = String(event);
                    }}
                    options={docTypes ?? []}
                    getValue={(val) => val.docType}
                />
            }
            {isPending &&
                <SkeletonKit
                    type='rect'
                />
            }
        </div>
    );
}