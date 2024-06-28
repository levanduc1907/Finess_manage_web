import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import { TSchedule } from '@/utils/FetchApi';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
const DayCards = ({ days }: { days: TSchedule['days'] }) => {
  const [expanded, setExpanded] = useState(false);
  if (!days) {
    return null;
  }
  const displayedDays = expanded ? days : days.slice(0, 3);

  return (
    <Stack>
      {displayedDays.map((day, index) => (
        <Card key={index} sx={{ marginBottom: 1, display: 'flex' }}>
          {day.sets[0] ? (
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={
                day.sets[0]?.imageUrl ||
                '/static/images/cards/contemplative-reptile.jpg'
              }
              alt="Set image"
            />
          ) : (
            <LocalHotelIcon sx={{ width: 151, height: 121 }} />
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Day {day.dayNumber}
              </Typography>
              <Typography variant="body2">
                {day.sets.length > 0
                  ? day.sets.map(set => set.name).join(', ')
                  : 'rest'}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      ))}
      {days.length > 3 && (
        <Button onClick={() => setExpanded(!expanded)}>
          {expanded ? 'See less' : 'See more'}
        </Button>
      )}
    </Stack>
  );
};

export default DayCards;
