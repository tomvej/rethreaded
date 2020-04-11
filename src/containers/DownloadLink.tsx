import React, {FC, useEffect, useRef, useState} from 'react';

type DownloadLinkProps = {
    data: unknown;
    name: string;
    onDownload: () => void;
}

const DownloadLink: FC<DownloadLinkProps> = ({data, name, onDownload}) => {
    const link = useRef<HTMLAnchorElement>(null);
    const [url, setUrl] = useState<string|undefined>(undefined);
    useEffect(() => {
        const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
        const url = window.URL.createObjectURL(blob);
        setUrl(url);

        return () => {
            window.URL.revokeObjectURL(url)
        }
    }, [data, setUrl]);
    useEffect(() => {
        if (url && link.current) {
            link.current.click();
            onDownload();
        }
    }, [url]);

    return (
        <a href={url} ref={link} download={name} />
    );
}

export default DownloadLink;
