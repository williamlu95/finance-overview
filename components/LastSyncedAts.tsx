import { formatDates, formatSyncName } from "@/utils/name-formatter";
import { Alert, AlertTitle, SxProps, Theme } from "@mui/material";
import { SyncRowType } from "@/types/finance";

type Props = {
  sync: SyncRowType;
  url?: string;
  sx?: SxProps<Theme>;
};

export default function LastSyncedAts({ sync, sx = {}, url }: Props): JSX.Element { 
  const handleClick = () => {
    if (url) {
      location.assign(url);
    }
  };

  return (
    <>
        <Alert
          icon={false}
          variant="filled"
          color="info"
          sx={{ mx: 0.5, color: "#fff", bgcolor: '#00468B', cursor: url ? 'pointer' : 'default', ...sx }}
          onClick={handleClick}
        >
          <AlertTitle noWrap sx={{ mb: 0 }}>
            {formatSyncName(sync.source)}
          </AlertTitle>
          {formatDates(sync.lastSyncedAt)}
        </Alert>
    </>
  );
}