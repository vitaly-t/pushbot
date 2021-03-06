// Accept the current contents of the user's buffer.

const createMentionDetector = require('./mentions')

module.exports = function (robot, msg) {
  const buffer = robot.bufferForUserId(msg.message.user.id)
  const detector = createMentionDetector(robot)
  const lines = buffer.commit()

  const result = []
  const speakers = new Set()
  const mentions = new Set()

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    for (const mention of detector.scan(line.text)) {
      mentions.add(mention)
    }

    if (!line.isRaw()) {
      speakers.add(line.speaker)
    }

    result.push(line)
  }

  return {lines: result, speakers, mentions}
}
