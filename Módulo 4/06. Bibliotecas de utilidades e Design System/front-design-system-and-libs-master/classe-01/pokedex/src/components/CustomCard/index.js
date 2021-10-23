import React from "react";
import useStyles from "./style";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

function CustomCard({ pokemon }) {
  const { name, weight, moves, abilities, avatar, img } = pokemon;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img className={classes.media} src={avatar} alt={name} />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={`${weight/10} kg`}
      />
      <CardMedia
        component="img"
        className={classes.media}
        image={img}
        title={name}
      />
      <CardContent>
        <Typography variant="h6">Habilidades</Typography>
        <ul>
          {abilities &&
            abilities.map((item) => (
              <Typography key={item.ability.name} variant="body1">
                <li style={{ marginLeft: 16 }}>{item.ability.name}</li>
              </Typography>
            ))}
        </ul>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {moves &&
            moves.map((item) => (
              <Typography key={item.move.name} variant="body2">
                <li style={{ marginLeft: 16 }}>{item.move.name}</li>
              </Typography>
            ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default CustomCard;
