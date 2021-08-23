# frozen_string_literal: true

require "test_helper"

class PollsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(
      name: "A B",
      email: "a@b.com",
      password: "welcome",
      password_confirmation: "welcome")
    @unauthorized_user = User.new(
      name: "Sam Smith",
      email: "sam@example.com",
      password: "welcome",
      password_confirmation: "welcome")
    @poll = Poll.create!(title: "This is a test poll", options: "[\"2\",\"3\",\"4\",\"5\"]", results: "[1,2,1,0]")
    @headers = headers(@user)
    @unauthorized_headers = headers(@unauthorized_user)
  end

  def test_should_list_all_polls
    get polls_url
    assert_response :success
    response_json = response.parsed_body
    all_polls = response_json["polls"]

    assert_equal all_polls.length, Poll.count
  end

  def test_create_poll
    params = { poll: { title: "A poll", options: ["A", "B", "C", "D"] } }
    post polls_url, params: params, headers: @headers
    assert_response :success
    poll = Poll.find_by(title: "A poll")
    assert_equal poll.title, params[:poll][:title]
  end

  def test_should_not_create_poll_for_unauthorized_person
    params = { poll: { title: "A poll", options: ["A", "B", "C", "D"] } }
    post polls_url, params: params, headers: @unauthorized_headers
    assert_response :unauthorized
    response_json = response.parsed_body
    assert_equal response_json["errors"], ["Could not authenticate with the provided credentials."]
  end

  def test_fetch_a_poll
    get poll_url(1), params: { id: 1 }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["poll"]["title"], "This is a test poll"
  end

  def test_update_poll
    put poll_url(1),
params: { id: 1, poll: { title: "New Title", options: ["A", "B", "C", "D"], results: [1, 1, 1, 1] } }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["poll"]["title"], "New Title"
  end
end
