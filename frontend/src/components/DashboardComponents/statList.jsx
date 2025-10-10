import React from 'react';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

import PieChartStat from './pieStat';
import Stat from './stat';

function StatList({total, incomplete, completed}) {
    return (
        <>
            <PieChartStat completed={completed} incomplete={incomplete} />
            <Stat icon={<ListAltIcon color="primary" />} label="Total Tasks" value={total} />
            <Stat icon={<AssignmentTurnedInIcon color="primary" />} label="Completed" value={completed} />
            <Stat icon={<PendingActionsIcon color="primary" />} label="Incomplete" value={incomplete} />
        </>   
    );
}

export default StatList;