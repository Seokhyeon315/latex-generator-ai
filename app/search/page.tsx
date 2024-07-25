// Server component for the search page
import { AI } from "@/lib/actions";
import { Search } from '@/components/search'
import { nanoid } from "@/lib/utils";

export const metadata = {
    title: 'Formula Search'
}

export default function SearchPage() {
    const id = nanoid()


    return (
        <AI>
            <Search id={id} />
        </AI>

    );
}
