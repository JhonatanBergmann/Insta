import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../store/actions/posts'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableWithoutFeedback as TWF
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

class AddComment extends Component {
    state = {
        comment: '',
        editMode: false
    }

    handleAddComment = () => {
        this.props.onAddComment({
            postId: this.props.postId,
            comment: {
                nickname: this.props.name,
                comment: this.state.comment
            }
        })

        this.setState({ comment: '', editMode: false })
    }

    render() {
        let CommentArea = null
        if (this.state.editMode) {
            CommentArea = (
                <View style={styles.container}>
                    <TextInput placeholder='Comente aqui...'
                        style={styles.input} autoFocus={true}
                        value={this.state.comment}
                        onChangeText={comment => this.setState({ comment })}
                        onSubmitEditing={this.handleAddComment} />
                    <TWF onPress={() => this.setState({ editMode: false })}>
                        <Icon name='times' size={15} color='#555' /> 
                    </TWF>
                </View>
            )
        } else {
            CommentArea = (
                <TWF onPress={() => this.setState({ editMode: true })}>
                    <View style={styles.container}>
                        <Image style={{ width: 20, height: 20 }} source={require('../../assets/imgs/comment.png')} />
                        <Text style={styles.caption}>
                            Adicione um comentário...
                        </Text>
                    </View>
                </TWF>

            )
        }

        return (
            <View style={{ flex:1 }}>
                {CommentArea}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    caption: {
        marginLeft: 10,
        fontSize: 12,
        color: '#CCC'
    },
    input: {
        width: '90%'
    }
})

const mapStateToProps = ({ user }) => {
    return {
        name: user.name
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddComment: payload => dispatch(addComment(payload))
    }
}

/* export default AddComment */
export default connect(mapStateToProps, mapDispatchToProps)(AddComment)