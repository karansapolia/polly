# frozen_string_literal: true

require "test_helper"

class PollsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @poll = Poll.new(title: "This is a test poll", options: "[\"2\",\"3\",\"4\",\"5\"]", results: "[1,2,1,0]")
    @user_headers = headers(@creator)
  end

  def test_should_list_all_polls
    get tasks_url, headers: @user_headers
    assert_response :success
    response_body = response.parsed_body
    all_tasks = response_body["tasks"]

    pending_tasks_count = Task.where(progress: "pending").count
    completed_tasks_count = Task.where(progress: "completed").count

    assert_equal all_tasks["pending"].length, pending_tasks_count
    assert_equal all_tasks["completed"].length, completed_tasks_count
  end

  def test_should_create_valid_task
    post tasks_url, params: { task: { title: "Learn Ruby", user_id: @creator.id } }, headers: @creator_headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Task")
  end
end
