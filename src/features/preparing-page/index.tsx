import { LoadingKit } from "@/shared/ui/loading-kit";
import classes from "./preparing-page.module.scss";
import { StatusPage, useLoadingPage } from "@/shared/model/loadingPage";
import { NotificationKit } from '@/shared/ui/notification-kit';

export function PreparingPage() {
  const { loadingPage, } = useLoadingPage();

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
        return (

          <div className={classes["loading-background"]}>
            <div className={classes["loading"]}>
              <NotificationKit
                type='error'
              >
                {loadingPage.errorMessage}
              </NotificationKit>
            </div>
          </div>
        )
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
