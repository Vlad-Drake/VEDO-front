import { SelectKit } from "@/shared/ui/select-kit";
import { TutorStep, TutorWrapper } from ".";
import { TextInputKit } from "@/shared/ui/text-input-kit";
import { ListCheckboxesKit } from "@/shared/ui/listCheckboxesKit";
import clsx from "clsx";

export function TutorApprovers({
    className,
}: {
    className: string,
}) {

    return (
        <div className={clsx(["flex gap-[10px]"], className)}>
            <TutorStep
                content="Укажите должность"
                position="bottom"
                index={0}
            >
                <TutorWrapper>
                    <SelectKit
                        placeholder='Выберите должность'
                        width="340px"
                        selectedId={null}
                        updateId={(_) => { }}
                        options={[]}
                        getValue={val => val}
                        getId={val => val}
                    />
                </TutorWrapper>

            </TutorStep>
            <TutorStep
                content="Укажите почту подписанта"
                position="bottom"
                index={1}
            >
                <TutorWrapper>
                    <TextInputKit
                        name="email"
                        width='330px'
                        value={""}
                        updateValue={(_) => { }}
                        placeholder="login@slata.com"
                    />
                </TutorWrapper>

            </TutorStep>
            <TutorStep
                content="Выберите какие документы может подписывать"
                position="bottom"
                index={2}
            >
                <TutorWrapper>
                    <ListCheckboxesKit
                        width='340px'
                        options={[]}
                        update={(_) => { }}
                        getValue={val => val}
                        getId={val => val}
                        getCheck={val => val}
                    />
                </TutorWrapper>

            </TutorStep>
        </div>
    );
}