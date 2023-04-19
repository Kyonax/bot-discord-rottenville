const core = require('@actions/core');
const github = require('@actions/github');


async function run() {
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
    const octokit = github.getOctokit(GITHUB_TOKEN);

    const { context = {} } = github;
    const { pull_request } = context.payload;

    try {
        await octokit.rest.issues.createComment({
            ...context.repo,
            issue_number: pull_request.number,
            body: 'Thank you for submitting a pull request! Wait until the Checklist ends the deployment, if anything goes wrong solve the issues and try again | The pull request will be only avaible to merge by Kyonax. | Do not forget to follow him on Twitter: @kyonax_on_tech @kyonax_on'
        })
    } catch (error) {
        console.log(error)
    }
}

run();