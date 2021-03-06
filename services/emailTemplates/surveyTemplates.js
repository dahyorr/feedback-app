const keys = require('../../config/keys')

module.exports = ({body, id})=>{
    return (
        `<html>
            <body>
                <div style="text-align:center">
                    <h3>I'd like your input!</h3>
                    <p>Please answer the following question: </p>
                    <p>${body}</p>
                    <div><a href="${keys.redirectDomain}/api/surveys/${id}/yes" target="_blank">Yes</a></div>
                    <div><a href="${keys.redirectDomain}/api/surveys/${id}/no" target="_blank">No</a></div>
                </div>
            </body>
        </html>`
        )
}