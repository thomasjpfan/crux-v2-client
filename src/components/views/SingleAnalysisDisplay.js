import React, { Fragment } from 'react'
import MainHeader from './MainHeader'
import ModalWebViewer from './ModalWebViewer'
import { Header, Container, Label, Segment } from 'semantic-ui-react'
import LinkButton from './LinkButton'

const SingleAnalysisDisplay = props => {
  const tags = props.tags || [{ node: { id: "UNTAGGEDID", name: 'Untagged' } }]
  const task = props.task || { name: "No Task" }

  return (<Fragment>
    <MainHeader>
      <Container>
        <Header as='h1'>{props.title}</Header>
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
          <Header as='h2'>Analysis Description</Header>
          <Label size='large' content={`Task: ${task.name}`} />
        </Segment>
        <Segment size='large'>
          <p>{props.description}</p>
          <ModalWebViewer
            buttonProps={{ secondary: true, content: 'View Analysis' }}
            title={props.title}
            iframeSrc={`https://widgets.figshare.com/articles/${props.figshareId}/embed`}
          />
          <ModalWebViewer
            buttonProps={{ secondary: true, content: 'View Data' }}
            title={props.title}
            iframeSrc={`https://widgets.figshare.com/articles/${props.dataset.figshareId}/embed`}
          />
        </Segment>
        <Segment size='large'>
          <Header as='h2'
            content={props.dataset.name} />
          <p>{props.dataset.description}</p>
          <LinkButton to={`/dataset/${props.dataset.id}`} secondary content='View Dataset' />
        </Segment>
      </Segment.Group>
    </Container>
  </Fragment>)
}

export default SingleAnalysisDisplay;
