import { LoadingKit } from "@/shared/ui/loadingKit/loadingKit";
import classes from "./preparing-page.module.scss";
import { StatusPage, useLoadingPage } from "@/shared/model/loadingPage";
import { NotificationKit } from '@/shared/ui/notificationKit/notificationKit';

export function PreparingPage() {
  const { loadingPage,  } = useLoadingPage();

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
            <div className="flex flex-col items-center justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <NotificationKit
                type='error'
              >
                {loadingPage.errorMessage}
              </NotificationKit>
            </div>
          </div>
        );
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
