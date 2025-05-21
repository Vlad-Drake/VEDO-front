import { ButtonKit } from '@/shared/ui/buttonKit/buttonKit';
import { SelectRadioKit } from '@/shared/ui/selectRadioKit/selectRadioKit';
import { TextInputKit } from '@/shared/ui/textInputKit/textInputKit';
import { NotificationKit } from '@/shared/ui/notificationKit/notificationKit';
import { useLoadingPage } from '@/shared/model/loadingPage';
import { useState } from 'react';

function Home() {
    const { loadingPage, loading, error, done } = useLoadingPage();
    done();
    function test() {
        console.log('Hi!')
    }
    const [testInput, setTestInput] = useState('');
    return (
        <div className='flex flex-col gap-[20px]'>
            <h1 className='text-center'>ВЭДО - внутренний электронный документооборот</h1>
            <p>Документы хранящиеся в ВЭДО используются для контроля за движением товара, готовой продукции, денежных средств, отражения результатов ревизии.</p>
            
            <ButtonKit
                btnContent={<p>Кнопка</p>}
                btnStatus='default'
                btnClick={test}
                btnType='primary'
            />
            <SelectRadioKit
                selectedId={null}
                options={[{ id: '1', name: '1' }, { id: '2', name: '2' }]}
            />
            <TextInputKit 
                password={false}
                value={testInput}
                updateValue={(value) => setTestInput(value)}
            />
            <NotificationKit
                type='error'
            >
                {'Ошибка'}
            </NotificationKit>
        </div>
        
    );
}

export const Component = Home;