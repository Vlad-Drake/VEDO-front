import { LoadingKit } from "@/shared/ui/loadingKit/loadingKit";
import classes from "./preparing-page.module.scss";
import { StatusPage, useLoadingPage } from "@/shared/model/loadingPage";

export function PreparingPage() {
  const { loadingPage } = useLoadingPage();

  const renderContent = () => {
    switch (loadingPage.status) {
      case StatusPage.Loading: {
        return (
          <div className={classes["loading-background"]}>
            <LoadingKit />
          </div>
        );
      }
      case StatusPage.Error: {
        return <div>Error</div>;
      }
      case StatusPage.Done: {
        return <></>;
      }
      default: {
        const _exhaustiveCheck: never = loadingPage.status;
        return <div>Неизвестный статус: {_exhaustiveCheck}</div>;
      }
    }
  };

  return renderContent();
}
