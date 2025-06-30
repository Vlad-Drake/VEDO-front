import { AnimatePresence, motion } from 'framer-motion';
import styles from './branch-settings.module.scss';
import { SkeletonKit } from '@/shared/ui/skeleton-kit';
import { TablesButtons } from './tables-btns';
import { TextInputKit } from '@/shared/ui/textInputKit/textInputKit';
import { SelectKit } from '@/shared/ui/selectKit';
import { moveRowDown, moveRowUp } from '../lib/sortingRow';
import type { SettingsRecord } from '../model/use-branch-settings';

export function BranchSettings({
    settings,
    selectedBranchId,
    isPending,
    branchCodes,
    deleteSetting,
    setSettings,
    Setting,
}: {
    settings: SettingsRecord,
    selectedBranchId: number | null,
    isPending: boolean,
    branchCodes?: {
        id: number;
        code: string;
    }[],
    setSettings: (settings?: SettingsRecord) => void,
    Setting: (settings?: SettingsRecord) => void,
    deleteSetting: (currentRow: number, settings?: SettingsRecord) => void,
}) {
    return (
        <div className='flex flex-col gap-[10px]'>
            <h3 className="text-left">Настройки ТТ</h3>
            <div className='flex gap-[10px]'>
                <h4 className='w-[340px]'>Тип кода</h4>
                <h4 className='w-[330px]'>Код</h4>
            </div>
            {selectedBranchId && !isPending &&
                <AnimatePresence>
                    {settings && Object.values(settings)
                        .sort((a, b) => a.row - b.row)
                        .map(setting =>
                            <motion.div
                                key={setting.row}
                                layout
                                initial={{ opacity: 0, x: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.3 }}
                                className={styles["list"]}
                            >
                                <SelectKit
                                    placeholder='Выберите настройку'
                                    width="340px"
                                    selectedId={setting.typeId}
                                    updateId={(event) => setSettings({ [setting.row]: { ...setting, typeId: event as number } })}
                                    options={branchCodes ?? []}
                                    getValue={val => val.code}
                                />
                                <TextInputKit
                                    width='330px'
                                    value={setting.code}
                                    updateValue={(event) => setSettings({ [setting.row]: { ...setting, code: event } })}
                                    placeholder="Введите значение"
                                />
                                <TablesButtons
                                    clickTop={() => setSettings(moveRowUp(setting.row, settings))}
                                    clickDown={() => setSettings(moveRowDown(setting.row, settings))}
                                    clickDelete={() => deleteSetting(setting.row, settings)}
                                />
                                {setting.row}
                            </motion.div>

                        )
                    }
                    <motion.div layout className={styles["add-row"]} key="plus">
                        <p>Добавить код</p>
                        <button onClick={() => Setting(settings)}>
                            ✚
                        </button>
                    </motion.div>
                </AnimatePresence>}
            {selectedBranchId && isPending &&
                [...Array(2)].map((_, index) =>
                    <div key={index} className={styles["list"]}>
                        <SkeletonKit type='rect' />
                        <SkeletonKit type='rect' />
                        <SkeletonKit type='rect' />
                    </div>
                )
            }
            {!selectedBranchId &&
                <h4 className='pl-[40px] pt-[30px] font-bold'>Здесь пусто</h4>
            }
        </div>
    );
}