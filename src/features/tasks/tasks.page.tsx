import { useLoadingPage } from "@/shared/model/loadingPage";
import { useEffect } from "react";

function Tasks() {
    const loadingPage = useLoadingPage();
    useEffect(() => {
        loadingPage.done();
    }, []);
    return (
        <div className="gap-[35px] content">
            задачи
        </div>
    );
}

export const Component = Tasks;