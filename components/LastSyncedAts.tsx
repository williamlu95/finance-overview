import { formatDates, formatSyncName } from "@/utils/name-formatter";
import { Alert, AlertTitle, SxProps, Theme } from "@mui/material";
import { SyncRowType } from "@/types/finance";

type Props = {
  sync: SyncRowType;
  sx?: SxProps<Theme>;
};

export default function LastSyncedAts({ sync, sx = {} }: Props): JSX.Element { 
  return (
    <>
        <Alert
          icon={false}
          variant="filled"
          color="info"
          sx={{ mx: 0.5, color: "#fff", ...sx }}
        >
          <AlertTitle noWrap sx={{ mb: 0 }}>
            {formatSyncName(sync.source)}
          </AlertTitle>
          {formatDates(sync.lastSyncedAt)}
        </Alert>
    </>
  );
}