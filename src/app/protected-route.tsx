import { useSession } from '@/shared/model/session';

export function ProtectedRoute() {
    const { session } = useSession();
}