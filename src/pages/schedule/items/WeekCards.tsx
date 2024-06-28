import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Box,
  Button,
} from '@mui/material';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';

import { useState } from 'react';
import { TSchedule } from '@/utils/FetchApi';

const WeekCards = ({ week }: { week: TSchedule['week'] }) => {
  const [expanded, setExpanded] = useState(false);
  const daysOfWeek = Object.keys(week);
  const displayedDays = expanded ? daysOfWeek : daysOfWeek.slice(0, 3);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Stack>
      {displayedDays.map((day, index) => (
        <Card key={index} sx={{ marginBottom: 1, display: 'flex' }}>
          {week[day][0] ? (
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={
                week[day][0]?.imageUrl ||
                '/static/images/cards/contemplative-reptile.jpg'
              }
              alt="Set image"
            />
          ) : (
            <LocalHotelIcon sx={{ width: 151, height: 121 }} />
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                {day}
              </Typography>
              <Typography variant="body2">
                {week[day].length > 0
                  ? week[day].map(set => set.name).join(', ')
                  : 'rest'}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      ))}
      {daysOfWeek.length > 3 && (
        <Button onClick={toggleExpanded}>
          {expanded ? 'See less' : 'See more'}
        </Button>
      )}
    </Stack>
  );
};

export default WeekCards;
