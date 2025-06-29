import { SelectKit } from "@/shared/ui/selectKit";
import { SkeletonKit } from "@/shared/ui/skeleton-kit";
import type { RefObject } from "react";
import { href, useNavigate } from "react-router-dom";

export function SelectDocType({
    docTypes,
    selectedDocId,
    docName,
    setSelectedDocId,
    isPending,
}: {
    docTypes?: {
        id: number;
        docType: string;
    }[],
    selectedDocId: number | null,
    docName: RefObject<string>,
    setSelectedDocId: (val: number | null) => void,
    isPending: boolean,
}) {

    const navigate = useNavigate();
    const setURL = (value: string) => {
        navigate(href("/doc-info/:doctype", { doctype: value }));
    }
    return (
        <div className="flex flex-row gap-10 justify-start">
            <p
                className={`w-[200px] content-center text-left`}
            >
                Выберите тип документа:
            </p>
            {docTypes && <SelectKit
                placeholder='Выберите тип документа'
                width="500px"
                selectedId={selectedDocId}
                updateId={(event) => {
                    const newId = Number(event)
                    setSelectedDocId(newId);
                }}
                updateName={(event) => {
                    setURL(String(event));
                    docName.current = String(event);
                }}
                options={docTypes ?? []}
                getValue={val => val.docType}
            />}
            {isPending &&
                <SkeletonKit
                    type='rect'
                />
            }
        </div>
    );
}