import React, { Fragment } from 'react'
import MainHeader from './MainHeader'
import { Container, Header, Segment, Label, Card, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ModalWebViewer from './ModalWebViewer'
import LoginFirstButton from './LoginFirstButton'

const SingleDatasetDisplay = props => {
  const tags = props.tags || [{ node: { id: "UNTAGGEDID", name: 'Untagged' } }]
  const tasks = props.tasks || []
  const analyses = props.analyses || []

  return (<Fragment>
    <MainHeader>
      <Container>
        <Header as='h1' content={props.title} />
      </Container>
    </MainHeader>
    <Container>
      <div className='spaced tags-container'>
        {tags.map(({ node: { id, name } }) => (
          <Label color='blue' size='large' key={id} content={name} />
        ))}
      </div>
      <Segment.Group>
        <Segment>
          <Header as='h2' content='Description' />
        </Segment>
        <Segment size='large' className='spaced'>
          <p>{props.description}</p>
          <ModalWebViewer
            buttonProps={{ secondary: true, content: 'View Data' }}
            title={props.title}
            iframeSrc={`https://widgets.figshare.com/articles/${props.figshareId}/embed`}
          />
          <LoginFirstButton secondary content='Create Analysis' to={`/createanalysis?datasetId=${props.datasetId}`} />
        </Segment>
      </Segment.Group>
      {tasks.length > 0 &&
        <Fragment>
          <Header as='h2'>Tasks</Header>
          <Grid columns={2}>
            {tasks.map(({ node: { id, name } }) => (
              <Grid.Column key={id}>
                <Segment>
                  <Header as='h3'>{name}</Header>
                  <LoginFirstButton color='black' content='Create Analysis' to={`/createanalysis?datasetId=${props.datasetId}&taskId=${id}`} />
                </Segment>
              </Grid.Column>))}
          </Grid></Fragment>}
      {analyses.length > 0 &&
        <Fragment>
          <Header as='h2'>Analyses</Header>
          <Card.Group itemsPerRow={2} stackable>
            {
              analyses.map(({ node: { id, name, task } }) => (
                <Card key={id} color='blue'>
                  <Card.Content>
                    <Link to={`/analysis/${id}`}>
                      <Header as='h3'>{name}</Header>
                      {task && <Label size='large'>Task: {task.name}</Label>}
                    </Link>
                  </Card.Content>
                </Card>
              ))
            }
          </Card.Group></Fragment>}
    </Container>

  </Fragment>)
}

export default SingleDatasetDisplay;
