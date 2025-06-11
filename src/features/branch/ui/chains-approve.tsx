import classes from './chains-approve.module.scss';
import { ButtonKit } from '@/shared/ui/buttonKit/buttonKit';

export function ChainsApprove() {
    return (
        <div className={classes['chain_wrapper']}>
            <section>
                <div className={classes['title']}>
                    <h2>Перемещения АХ</h2>
                    <ButtonKit
                        btnContent='Редактировать'
                        btnStatus='default'
                        btnClick={() => console.log('edit')}
                        btnType='primary'
                    />
                </div>
                <div className={classes['chain']}>
                    <div className={classes['chain__source']}>
                        <h3>Источник 1С</h3>
                    </div>
                    <h1>→</h1>
                    <div className={classes['chain__block_approver']}>
                        <p>Заместитель директора магазина</p>
                        <p>Заместитель директора магазина</p>
                    </div>
                    <h1>→</h1>
                    <div className={classes['chain__block_approver']}>
                        <p>Заместитель директора магазина</p>
                    </div>
                </div>
                <div className='border-t-2 border-dashed'></div>
            </section>
            <section>
                <div className={classes['title']}>
                    <h2>Перемещения АХ</h2>
                    <ButtonKit
                        btnContent='Редактировать'
                        btnStatus='default'
                        btnClick={() => console.log('edit')}
                        btnType='primary'
                    />
                </div>
                <div className={classes['chain']}>
                    <div className={classes['chain__source']}>
                        <h3>Источник 1С</h3>
                    </div>
                    <h1>→</h1>
                    <div className={classes['chain__block_approver']}>
                        <p>Appr 1</p>
                        <p>Appr 2</p>
                    </div>
                    <h1>→</h1>
                    <div className={classes['chain__block_approver']}>
                        <p>Appr 3</p>
                    </div>
                </div>
                <div className='border-t-2 border-dashed'></div>
            </section>
            <section>
                <div className={classes['title']}>
                    <h2>Перемещения АХ</h2>
                    <ButtonKit
                        btnContent='Редактировать'
                        btnStatus='default'
                        btnClick={() => console.log('edit')}
                        btnType='primary'
                    />
                </div>
                <div className={classes['chain']}>
                    <div className={classes['chain__source']}>
                        <h3>Источник 1С</h3>
                    </div>
                    <h1>→</h1>
                    <div className={classes['chain__block_approver']}>
                        <p>Appr 1</p>
                        <p>Appr 2</p>
                    </div>
                    <h1>→</h1>
                    <div className={classes['chain__block_approver']}>
                        <p>Appr 3</p>
                    </div>
                </div>
                <div className='border-t-2 border-dashed'></div>
            </section>
            <section>
                <div className={classes['title']}>
                    <h2>Перемещения АХ</h2>
                    <ButtonKit
                        btnContent='Редактировать'
                        btnStatus='default'
                        btnClick={() => console.log('edit')}
                        btnType='primary'
                    />
                </div>
                <div className={classes['chain']}>
                    <div className={classes['chain__source']}>
                        <h3>Источник 1С</h3>
                    </div>
                    <h1>→</h1>
                    <div className={classes['chain__block_approver']}>
                        <p>Appr 1</p>
                        <p>Appr 2</p>
                    </div>
                    <h1>→</h1>
                    <div className={classes['chain__block_approver']}>
                        <p>Appr 3</p>
                    </div>
                </div>
                <div className='border-t-2 border-dashed'></div>
            </section>+
        </div>
    );
}