import React from "react";

class PostAdd extends React.Component{
    render() {
        return (
            <div className={'setting_form_container_a'}>
                <div className={'center'}>
                    <h3>New Post</h3>
                </div>
                <div className={'setting_form_container'}>
                    <div className={'setting_form_content input'}>
                        <h5>Choose file:</h5>
                        <input type={'file'} className={'setting_post_file'}/>
                    </div>
                    <div className={'setting_form_content'}>
                        <h5>Text:</h5>
                        <input type={'text'} className={'setting_post_text input'}/>
                    </div>
                </div>
                <button className="center_b profile_follow" >submit</button>
            </div>
        );
    }
}

export default PostAdd