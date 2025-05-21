import { useLoadingPage } from '@/shared/model/loadingPage';

function Branch() {
    const { loadingPage, loading, error, done } = useLoadingPage();
    done();
    return <div>Branch</div>
}

export const Component = Branch;
