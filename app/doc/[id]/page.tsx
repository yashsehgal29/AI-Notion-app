"use client"
import Document from '@/components/ui/Document';
import { use } from 'react';

function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params); 

    // console.log(id);
    return (
        <div className='flex flex-col flex-1 min-h-screen'>
            <Document id={id } />
        </div>
    );
}

export default DocumentPage;
